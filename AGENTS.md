# AGENTS.md — GUILD24 Engineering / QA Operating Rules

> Permanent process guardrails for implementation / QA work.
> This file is not a Design SSOT.
>
> Do not copy game rules, balance numbers, UX specifications, or Canonical design text here.
> Resolve Design Truth from the current Canonical Project Sources.

---

# 1. AUTHORITY

Priority:

```text
1. User's newest confirmed decision
2. Current Canonical Project Sources
3. Current Source
4. Past chat / old instructions / old specs
```

```text
DESIGN TRUTH         = Current Canonical Project Sources
IMPLEMENTATION TRUTH = Current Source
```

If Canonical and Source differ:
- do not reinterpret Canonical to match Source
- do not silently change Design
- classify the difference as Implementation Bug, Missing Adoption, Runtime UX Bug, Test Gap,
  Design Issue, or Unresolved when evidence is insufficient

Never change approved Design without User approval.

---

# 2. PROJECT SOURCE ACCESS

Do not treat a Canonical file as missing because it is absent from initial context.

Required order:

```text
SPEC_INDEX
→ identify exact current filename
→ explicitly Search/Open that Project Source
→ read only the relevant Spec / QA / Source
```

Only after that fails may you report:

```text
PROJECT SOURCE ACCESS/INDEX ISSUE
```

Never substitute memory, an older spec, a chat summary, or Current Source for inaccessible Canonical.

Default reading strategy:

```text
SEARCH
→ SMALL READ
→ EXPAND ONLY IF NEEDED
```

Do not broadly read the repository or all specs without a concrete task reason.

---

# 2A. PRESENTATION TASK READ PATH

For Presentation Upgrade work, do not full-read the project.

```text
SPEC_INDEX
-> PRESENTATION_SYSTEM_v2.8.0.md
-> active PRESENTATION_POLISH_BATCH*_v2.8.0.md
-> only relevant Source
```

Open PRESENTATION_POLISH_v2.8.0.md only when the active Batch routes to a later-phase / audio rule.

Visual Presentation work is screenshot-driven:

```text
capture BEFORE
-> implement a small surface
-> capture AFTER
-> separate visual review
-> narrow fix
-> stop at active Batch boundary
```

Do not accept Presentation quality from Source inspection or the implementer's self-evaluation alone.

---

# 3. SCOPE / CHANGE DISCIPLINE

Before implementation:

```text
REUSE SOURCE
→ PLATFORM / EXISTING DEPENDENCY
→ SMALL PATCH
→ MINIMAL NEW IMPLEMENTATION
```

Do not:
- add speculative features
- refactor or clean unrelated code/files
- create unnecessary abstractions
- implement future-version ideas early
- make Design decisions while doing WORK

Solve the confirmed problem with the smallest safe change.
Do not sacrifice safety, data preservation, required testing, or maintainability.

---

# 4. COMMIT / WORKING-TREE DISCIPLINE

One logical task = one reviewable commit.
A code change and the test that verifies that same change may be committed together.

Before changing task or subsystem:

```text
targeted verify
→ inspect diff
→ commit logical unit
→ confirm working-tree state
→ only then continue
```

Uncommitted work is not a checkpoint.
Create a clean commit before risky recovery, branch switching, bulk edits, or reconstruction work.

During normal work, do not rewrite shared history or restore an old tree wholesale.
Use old commits only as evidence and re-apply the minimum necessary change to Current Source.

Before editing / freezing, know the current HEAD and working-tree state.
Do not call a state FROZEN unless intended work is committed and the tree is clean.

---

# 5. SOURCE / TEST / QA TRUTH

Tests are not Design Truth.
A passing test does not prove Canonical adoption.

When Source, test, and Canonical disagree:
- identify which one is stale or wrong before editing
- update a test only when the Canonical expectation is known
- never derive Expected values from Runtime merely to obtain PASS

QA exists to find mismatch, regression, runtime failure, stale tests, and incomplete adoption.
FAIL is a valid result.

Never obtain PASS by:
- deleting/skipping a failing case
- weakening an assertion or tolerance without Design basis
- copying Runtime values into Expected
- changing RNG/seed to prefer an outcome
- silently excluding an edge case or strategy
- changing Production Balance merely to satisfy a measurement
- claiming full PASS after only a subset was rerun

---

# 6. QA / FIX PHASE SEPARATION

Default cycle:

```text
IMPLEMENT
→ TARGETED VERIFY
→ COMMIT
→ FREEZE
→ QA
```

During a frozen QA run, do not modify Production Source, Tests, Harness, Fixtures, or Expected values.

If QA finds a bug:

```text
STOP frozen QA
→ report finding
→ begin separate FIX cycle
→ make smallest correct fix
→ add/update regression coverage when needed
→ commit
→ freeze again
→ rerun relevant QA
```

Do not edit mid-run and continue calling it the same frozen QA.

---

# 7. RUNTIME VERIFICATION

Source-level presence is not enough for interaction-sensitive UX.

When relevant, verify the actual affected browser flow on the appropriate viewport/device class,
including the interactions and persistence boundaries changed by the task.

Check runtime errors for affected flows.
Unit tests do not replace required runtime verification.

A Source implementation may still be a:

```text
RUNTIME UX BUG
```

when the player-facing behavior fails.

---

# 8. RECOVERY / BULK EDIT SAFETY

For regressions, compare Current Canonical, Current Source, and relevant Git history.
Distinguish what evidence supports: never implemented, lost implementation, later regression,
runtime-only failure, stale test/copy, or unresolved root cause.

If evidence is insufficient:

```text
ROOT CAUSE UNRESOLVED
```

Do not invent rollback history or reconstruct undocumented old states from memory.

For bulk/scripted edits:
- start from a committed baseline
- restrict paths / matches explicitly
- inspect the diff immediately
- stop or revert if scope is broader than intended

Do not use broad replacement across Production + Tests + Docs without intentional review of every target.

---

# 9. DESIGN CHANGE CONTROL

WORK must not decide unresolved Design.

If required behavior is undefined:

```text
UNRESOLVED
```

Report/ask rather than inventing a rule.

If measurement violates a balance target:

```text
BALANCE FINDING
```

Do not auto-tune Production values.

After User-approved Design change:
- update the proper Canonical owner
- update only tests that represent the changed rule
- do not preserve superseded values as alternate live expectations

---

# 10. DOCUMENT / VERSION HYGIENE

Detailed Canonical truth belongs only in its routed owner sources.
`AGENTS.md` contains process only.

Do not:
- duplicate current rules across multiple live documents
- keep superseded discussion as another live expectation
- mass-copy old specs into a new version
  (exception: a User-approved consolidation that merges an owner's inheritance chain verbatim, with
  every dropped line accounted in a ledger checked by `npm run ssot:check`; see reports/ssot-consolidation/)

Follow the current `SPEC_INDEX` routing and inheritance structure.
Versioning / manifest changes must reflect the current project routing rather than historical examples in this file.

---

# 11. REPORTING / HANDOFF

Use accurate status labels when relevant:

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

Never summarize a real failure as "PASS with notes".

WORK final reports are DIRECTOR review packets, not work diaries.
Default to:
- Branch / HEAD
- logical commit(s)
- material changes only
- targeted / regression / full-test / runtime status as applicable
- exact review risk or blocker, otherwise NONE

Do not repeat:
- documents read
- chronological work narration
- Task text
- Canonical text already available in the repository
- raw PASS logs
- unrelated project history

Handoffs are execution pointers, not portable project copies.

Include only what the receiving role needs now:
- role / base when operationally necessary
- active task
- exact routed documents / QA / Source entry points
- newly approved User decision not yet promoted to those documents
- stop boundary when it differs from normal workflow

Do not carry rejected, superseded, speculative, obsolete, or already-completed context into a handoff.
Do not repeat AGENTS rules inside the handoff beyond "Read AGENTS.md first and follow it."

WORK's own PASS is not final DIRECTOR approval.
If no next task was explicitly authorized, stop after the assigned scope.

---

# 12. STOP CONDITIONS

Stop and report instead of continuing when:
- Canonical cannot be accessed after SPEC_INDEX lookup
- Design is unresolved
- Current Source contains an unexpected broad regression
- a scripted/bulk edit changes unrelated scope
- QA finds a critical runtime blocker
- the working-tree state cannot be explained
- the requested action would overwrite uncommitted work
- recovery would require guessing the intended old state

Do not "finish anyway".

---

# 13. DEFINITION OF DONE

A task is done only when all applicable conditions hold:
- correct Canonical owner / requirement identified
- scope stayed limited
- minimal implementation or document change completed
- relevant behavior verified
- regression coverage updated when needed
- no unrelated files changed
- logical unit committed
- working-tree / HEAD state understood
- no blocker or unresolved issue hidden

Release/freeze work additionally requires a clean recorded HEAD and the routed final QA / adoption checks.

---

# 14. SESSION / TASK CHUNKING — MANDATORY

Large audits, document cleanups, and cross-file adoption work must be split into small execution batches.

Default:

```text
one narrow batch
→ inspect diff
→ verify
→ commit
→ report
→ STOP
```

Do not:
- read or edit the entire project in one pass when it can be divided safely
- chain unrelated document groups in one execution turn
- continue automatically into the next batch after a completed commit
- expand scope because adjacent stale material is discovered

Divide broad work by owner, document class, or subsystem.

If the session, tool, or network becomes unstable:

```text
STOP ALL
→ make no further edits
→ report exact last completed commit
→ report interrupted batch
→ report remaining unopened batches
```

Resume only from committed repository state and current routed documents, not from memory.

---

# 15. CORE PRINCIPLE

Keep the repository recoverable and explainable.

Prefer:

```text
small change
small commit
clear evidence
honest failure
reproducible QA
```

over mixed changes, hidden state, history reconstruction, PASS-at-any-cost, or silent Design drift.

**Optimize for correctness and traceability, not for PASS.**
