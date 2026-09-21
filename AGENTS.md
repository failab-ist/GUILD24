# AGENTS.md — GUILD24 Engineering / QA Operating Rules

> This file defines **how an implementation agent must work** in the GUILD24 repository.
> It is a permanent process guardrail, not a Design SSOT.
>
> Do **not** copy game rules, balance numbers, UX specifications, or Canonical design text into this file.
> For Design Truth, always follow the current Canonical Project Sources.

---

# 1. AUTHORITY

Priority:

```text
1. User's newest confirmed decision
2. Current Canonical Project Sources
3. Current Source
4. Past chat / old instructions / old specs
```

Definitions:

```text
DESIGN TRUTH         = Current Canonical Project Sources
IMPLEMENTATION TRUTH = Current Source
```

If Canonical and Source differ:

- do not reinterpret Canonical to match Source
- do not silently change Design
- classify the difference as:
  - Implementation Bug
  - Missing Adoption
  - Runtime UX Bug
  - Test Gap
  - Design Issue
  - Unresolved, if evidence is insufficient

Never change approved Design without User approval.

---

# 2. PROJECT SOURCE ACCESS

Do not decide that a Canonical file is missing just because it is not visible in initial context.

Required order:

```text
SPEC_INDEX
→ identify exact latest filename
→ explicitly Search/Open that Project Source
→ read only the relevant Spec / QA / Source
```

Only after that fails may you report:

```text
PROJECT SOURCE ACCESS/INDEX ISSUE
```

Never substitute:
- memory
- an older spec
- a chat summary
- current Source

for inaccessible Canonical.

Default reading strategy:

```text
SEARCH
→ SMALL READ
→ EXPAND ONLY IF NEEDED
```

Do not perform broad repository/spec reading without a concrete reason.

---

# 3. SCOPE DISCIPLINE

Before implementation:

```text
REUSE SOURCE
→ PLATFORM / EXISTING DEPENDENCY
→ SMALL PATCH
→ MINIMAL NEW IMPLEMENTATION
```

Do not:
- add speculative features
- refactor unrelated code
- clean unrelated files
- create unnecessary abstractions
- implement future-version ideas early
- modify Design while doing implementation work

A task must solve the current confirmed problem with the smallest safe change.

Safety, data preservation, required testing, and maintainability must not be sacrificed.

---

# 4. COMMIT DISCIPLINE — MANDATORY

## 4.1 One logical task = one commit

Work in small, reviewable units.

Examples:

```text
fix: restore v2.6.1 order confirm flow
fix: correct major injury recovery 2 to 0
fix: remove stale top-level settings controls
fix: repair night result runtime reference
test: add order confirm regression coverage
docs: update v2.6.1 current manifest
```

Do not combine unrelated fixes into one large commit.

A code change and the test that verifies that same change may be committed together.

## 4.2 Commit before changing task

Before moving to another subsystem or issue:

```text
1. run targeted verification
2. inspect git diff
3. commit the completed logical unit
4. confirm working tree state
5. only then start the next task
```

Do not leave multiple unrelated uncommitted changes in the working tree.

## 4.3 Never rely on uncommitted recovery state

Uncommitted work is not a safe checkpoint.

Before:
- large QA
- recovery work
- branch switching
- bulk script edits
- risky search/replace
- source reconstruction

create a clean commit first.

## 4.4 No history rewriting during normal work

Forbidden unless the User explicitly requests it:

```text
force push
rebase that rewrites shared history
reset --hard to an older implementation
history squashing that hides intermediate fixes
mass checkout of an old commit over current work
```

When recovering a regression, inspect history and re-apply only the necessary change to current Source.

Do not restore an old tree wholesale.

---

# 5. CHANGE SAFETY

Before editing:

```text
git status
git rev-parse HEAD
```

After editing:

```text
git diff
targeted test
```

Before a milestone / QA freeze:

```text
git status
git diff
git rev-parse HEAD
```

The expected frozen state is:

```text
working tree clean
known HEAD
all intended work committed
```

If the tree is not clean, do not describe the state as FROZEN.

---

# 6. SOURCE VS TEST

Tests are not Design Truth.

A passing test does not prove the implementation matches Canonical.

If Source and Canonical disagree but a test passes:

```text
the test may be stale
```

If a test fails after a confirmed Design change:

- first determine whether Source is wrong or the test expectation is stale
- update the stale test only when the Canonical expectation is known
- do not weaken the assertion merely to make it pass

Never derive Expected values from current Runtime output just to satisfy a test.

---

# 7. QA PURPOSE — CRITICAL

## QA is for finding errors, not producing PASS.

The goal is:

```text
detect mismatch
detect regression
detect runtime failure
detect stale test
detect incomplete adoption
```

PASS is only a result when the implementation is actually correct.

A FAIL is a valid and useful QA result.

Never modify code merely because QA must "end green".

---

# 8. QA PHASE SEPARATION

Use this cycle:

```text
IMPLEMENT
→ TARGETED VERIFY
→ COMMIT
→ FREEZE
→ QA
```

During a frozen QA run:

```text
DO NOT MODIFY:
- Production Source
- Tests
- Measurement Harness
- Fixtures
- Expected values
```

If QA finds a bug:

```text
1. stop the frozen QA
2. report the finding
3. leave the failed evidence intact
4. begin a separate FIX cycle
5. make the smallest fix
6. add/update the correct regression test if needed
7. commit
8. freeze again
9. rerun QA from the new clean HEAD
```

Do not edit Source/Test in the middle of a QA run and continue calling it the same frozen run.

---

# 9. FORBIDDEN QA BEHAVIOR

Never do any of the following to obtain PASS:

```text
- delete a failing test
- weaken an assertion
- broaden tolerance without Design approval
- skip a failing case
- convert an exact requirement into a loose smoke test
- copy Runtime values into Expected
- change RNG/seed until a preferred result appears
- remove an edge case from the harness
- silently exclude a failing strategy
- modify Production Balance because a measurement looks inconvenient
- claim "PASS" when only a subset was rerun
```

When a test is wrong, explain why it is wrong relative to Canonical before changing it.

---

# 10. FUNCTIONAL QA VS RUNTIME UX QA

Code presence is not enough for UX.

Examples:

```text
scroll restoration function exists
≠
mobile scroll is actually stable
```

For interaction-sensitive UI, verify actual runtime behavior.

Required when relevant:

```text
Desktop browser
Mobile viewport / mobile browser
real click/tap sequence
phase transition
scroll position
focus behavior
modal open/close
save/reload
console errors
```

A Source-level implementation may still be classified as:

```text
RUNTIME UX BUG
```

if the player experience fails.

---

# 11. CRITICAL RUNTIME SMOKE TEST

After changes affecting the main run loop, perform an actual browser progression.

Minimum when applicable:

```text
START
→ MORNING
→ ORDER
→ SALE
→ NIGHT
→ CLOSING
→ NEXT DAY
```

Also exercise:
- at least one successful sale
- at least one refusal path if affected
- at least one injury result if result UI is affected
- next / skip-all result flow
- save/reload when persistence code changed

Required outcome:

```text
Console Runtime Error = 0
No phase-blocking ReferenceError / TypeError
```

Unit tests do not replace this smoke test.

---

# 12. REGRESSION / RECOVERY RULES

When the User reports that previously working UX or logic disappeared:

1. compare Current Canonical to Current Source
2. inspect relevant Git history
3. identify the last verifiable good behavior when possible
4. distinguish:
   - never implemented
   - implementation lost
   - later regression
   - runtime-only failure
   - stale test/copy
5. if evidence is insufficient, report:

```text
ROOT CAUSE UNRESOLVED
```

Do not invent a rollback story.

Do not reconstruct undocumented past states from memory.

Do not restore an old commit wholesale.

Use old commits only as evidence/reference and apply a minimal current patch.

---

# 13. BULK / SCRIPTED EDITS

Bulk replacement scripts are high risk.

Before running one:

```text
1. commit current clean baseline
2. limit paths explicitly
3. inspect exact intended matches
```

After running one:

```text
1. inspect git diff immediately
2. verify only intended files changed
3. revert the script result if scope is broader than intended
```

Do not use broad string replacement across Production + Test + Docs unless each target is intentionally reviewed.

---

# 14. DESIGN CHANGE CONTROL

Implementation work must not decide unresolved Design.

If a required behavior is not defined:

```text
UNRESOLVED
```

and ask/report rather than inventing a rule.

When a balance measurement violates a target:

```text
report BALANCE FINDING
```

Do not auto-tune Production values.

When Design is intentionally changed by User approval:
- update the proper Canonical owner
- update only tests that represent that changed rule
- do not preserve superseded numbers as alternate live expectations

---

# 15. DOCUMENT / VERSION HYGIENE

Do not duplicate detailed Canonical rules across multiple files.

Canonical numeric / UX / QA truth belongs in its owner sources.

`AGENTS.md` contains process only.

For patch releases:

```text
2.6.0 → initial feature release
2.6.1 → corrective patch / recovery of approved 2.6 behavior
2.7.0 → new Core Play / Design revision
```

A corrective implementation recovery does not become a new minor version merely because many bugs were found.

Create a new patch-version manifest when the current shipped/implemented patch state changes.

Do not mass-copy every old spec into the new version.
Only changed owner documents receive a new version; unchanged owners are referenced.

---

# 16. HANDOFF / REPORTING

Reports must distinguish real status when relevant:

```text
PASS
IMPLEMENTATION BUG
MISSING ADOPTION
RUNTIME UX BUG
TEST GAP
BALANCE FINDING
DESIGN ISSUE
BLOCKED
ROOT CAUSE UNRESOLVED
```

Do not summarize failures as "PASS with notes".

## 16.1 WORK final output is a DIRECTOR review packet

WORK's final response is not a User-facing work diary.

Its default purpose is to give DIRECTOR only the minimum evidence needed to inspect Source / Diff / QA.

DIRECTOR is expected to inspect the implementation directly.
Therefore do not re-explain Task text, Canonical rules, or implementation history in the final response.

Default final format:

```text
DIRECTOR REVIEW

Branch / HEAD:

Commits:
- <sha> — <logical task>

Changed:
- material implementation changes only, 3–6 concise lines

Verification:
- targeted QA: PASS / FAIL
- relevant regression / deterministic tests: PASS / FAIL / N/A
- npm test: PASS / FAIL
- runtime smoke: PASS / FAIL / N/A

Review points:
- only risks / decisions DIRECTOR should inspect directly
- NONE if there are none

Blocker / unresolved:
- NONE
- or the exact blocker / unresolved item
```

## 16.2 Do not output by default

Do not include these in the final response unless needed to explain a FAIL / blocker:

- documents or files read
- step-by-step implementation process
- work diary / chronological narration
- Task instructions repeated back
- Canonical rules copied back
- full test list
- raw PASS logs
- long rationale for ordinary implementation choices
- already-known project background
- CI / Pages detail when it is not blocking the task

If evidence is needed for a failure, include only the smallest relevant excerpt.

## 16.3 Review boundary

WORK's own PASS is not final Design or implementation approval.

After completing the assigned scope:

```text
implement
→ verify
→ commit
→ report minimum evidence
→ wait for DIRECTOR review
```

If no next Task was explicitly authorized, do not continue into later work.

For frozen release / final QA, keep the required evidence in the repository / logs, but the final chat
response still stays compact unless DIRECTOR asks for the exact command list or raw evidence.

---

# 17. USER-APPROVED HANDOFF HYGIENE

Handoffs are execution pointers, not portable copies of the project.

This rule applies to both:
- WORK handoffs
- DIRECTOR handoffs

## 17.1 Minimum necessary content only

Include only what the receiving role needs to start the next task:

- current role
- current repository / branch / HEAD only when operationally relevant
- current active task / review target
- exact Canonical / QA / Source routing needed to find the truth
- any newly approved User decision that is not yet available in the routed documents
- explicit stop / merge boundary only when it differs from the standing workflow

Everything else should be omitted.

## 17.2 Document-first, no duplication

If information can be resolved from current repository documents, reference the document instead of
copying its contents into the handoff.

Prefer:

```text
Read SPEC_INDEX -> owner spec -> routed QA -> affected Source.
Implement/review SA-Qxx-yy.
```

Do not paste or paraphrase long Canonical rules, numeric tables, acceptance criteria, workflow rules,
or project history that the receiving role can read from the repository.

Do not repeat AGENTS.md rules inside a handoff.
The handoff may say only:

```text
Read AGENTS.md first and follow it.
```

Exception:
repeat an exact rule only when the User has just approved it and it has not yet been promoted into
the current routed Canonical / QA, or when a precise execution clarification is required to prevent
a known ambiguity. Once promoted, remove the duplicate from later handoffs.

## 17.3 Role-specific only

A WORK handoff contains only what WORK needs to implement / test the current task.

A DIRECTOR handoff contains only what DIRECTOR needs to inspect / judge the current implementation.

Do not give either role:
- the other role's unnecessary operating detail
- unrelated future tasks
- project-wide recap
- completed-task history unless needed to prevent rework
- discussion history

## 17.4 Never carry rejected or stale context

Do not include:
- rejected candidates
- superseded values
- speculative alternatives
- internal reasoning
- abandoned implementation ideas
- obsolete branch / commit history
- already-completed task detail that the active task does not depend on

This prevents accidental anchoring and resurrection of rejected Design.

## 17.5 Default handoff shape

Use the smallest shape that works:

```text
ROLE:
BASE: <only if needed>
ACTIVE TASK:
READ:
- <exact current documents / sections / SA-Q ids>
DO:
- <current execution or review target only>
STOP:
- <boundary only if needed>
```

If a field adds no execution value, omit it.

---

# 18. STOP CONDITIONS

Stop and report instead of continuing when:

```text
- Canonical cannot be accessed after SPEC_INDEX lookup
- Design is unresolved
- Current Source contains an unexpected broad regression
- a scripted edit changed unrelated files
- QA finds a critical runtime blocker
- the working tree state cannot be explained
- a requested action would overwrite uncommitted work
- a recovery action would require guessing the old intended state
```

Do not "finish anyway".

---

# 19. DEFINITION OF DONE

A task is done only when all applicable conditions hold:

```text
[ ] Canonical requirement identified
[ ] Scope limited
[ ] Minimal implementation completed
[ ] Relevant runtime/source behavior verified
[ ] Regression test added/updated when needed
[ ] No unrelated files changed
[ ] Logical unit committed
[ ] Working tree state understood
[ ] No unresolved blocker hidden
```

A release / patch QA is done only when:

```text
[ ] Final intended changes are committed
[ ] git status is clean
[ ] frozen HEAD is recorded
[ ] QA runs without modifying Source/Test/Harness
[ ] failures are reported as failures
[ ] browser smoke test covers affected main-loop paths
[ ] console runtime errors = 0
[ ] Canonical adoption audit is complete
```

---

# 20. CORE PRINCIPLE

The repository must remain recoverable and explainable.

Prefer:

```text
small change
small commit
clear evidence
honest failure
reproducible QA
```

over:

```text
large hidden working tree
mixed changes
green tests at any cost
history reconstruction
silent Design drift
```

**Never optimize for PASS. Optimize for correctness and traceability.**
