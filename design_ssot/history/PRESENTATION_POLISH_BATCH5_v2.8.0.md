# PRESENTATION POLISH — BATCH 5

DOC=PRESENTATION_POLISH_BATCH5
OWNER=presentation_batch5,final_presentation,boss_confirm,final_backdrop
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # detail superseded by PRESENTATION_PRINCIPLES_v2.8.0.md (principles only; implemented detail lives in Source)
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_EXECUTION_SPEC
STATUS=CLOSED_BATCH_5

## SCOPE

Batch 5 owns the D30 FINAL presentation pass:

- B5-0 — Boss backdrop asset intake / mapping / preservation checkpoint
- B5-1 — D30 FINAL entry / Boss-domain wall backdrop integration
- B5-2 — Final party selection / Final preparation presentation audit and polish
- B5-3 — BOSS CONFIRM / Final commit presentation
- B5-4 — Final resolution transition verification into the already-approved END / ENDFAIL surfaces

Batch 5 does NOT redesign the B3 END / ENDFAIL presentation.
It verifies that CLEAR / FAIL arrive there with the correct Final truth and no stale Final layer.

## READ BOUNDARY

Always read:
1. AGENTS.md
2. SPEC_INDEX_v2.8.0.md
3. PRESENTATION_SYSTEM_v2.8.0.md
4. this file

Then SMALL READ only as needed:
- PRESENTATION_POLISH_v2.8.0.md — BOSS / FINAL PRESENTATION PAYOFF and domain-backdrop role
- FINAL_EXPEDITION_v2.8.0.md — D25 reuse, D30 Player Flow, Final preparation / accounting / acceptance
- BOSS_v2.8.0.md — Boss-specific Final modifier truth only when needed
- UI_UX_v2.8.0.md / UI_UX_QA_v2.8.0.md — FINAL / Boss presentation clauses
- current FINAL / bossConfirm Source only

Do not reopen approved B1-B4 surfaces without a direct regression.

## CANONICAL FINAL TRUTH

D25 already owns and persists the exact Final Family Pair + Hazard state.

D30:
- reveals no new Boss information;
- reuses the D25 Final state exactly;
- may heighten presentation using only information already known by D25.

Exact Player-facing Final flow remains:

    출전 NPC 선택
    -> FINAL 준비
    -> 결과

Final mechanics, Item transfer, fixed-price accounting, Wallet, stock, Gross Sales, GREED snapshot,
Boss modifiers and resolution remain owned by FINAL_EXPEDITION / BOSS and are not presentation
tuning knobs.

## B5-0 — BACKDROP ASSET INTAKE / MAPPING CHECKPOINT

The User has supplied seven authored Boss domain / throne-room / wall background assets.

These are production assets for D30 FINAL only.

Before runtime integration:

1. locate the exact seven source files supplied for this task;
2. inspect each source visually and record:
   - original filename
   - pixel dimensions
   - file format
   - byte size
   - SHA-256
3. propose one mapping:
   Boss ID / Boss name -> source filename
4. state confidence for each mapping;
5. report any ambiguous mapping explicitly.

Do NOT silently infer an uncertain mapping.

If any mapping is ambiguous:
- name only the ambiguous assets / Bosses;
- show the proposed alternatives;
- STOP and ask the User / DIRECTOR.

If all seven are unambiguous:
- say so explicitly;
- still deliver the mapping table before binding it in runtime;
- wait for the User / DIRECTOR acknowledgement.

### LOSSLESS SOURCE PRESERVATION — HARD RULE

The seven supplied originals must be stored in the repository byte-for-byte unchanged.

For original source files:
- no resize;
- no crop;
- no re-encode;
- no compression pass;
- no colour conversion;
- no metadata stripping;
- no filename collision overwrite;
- no lossy WebP conversion in place.

Prefer the nearest existing production-asset source structure.
Do not invent a broad new asset framework merely for seven files.

Verify preservation with SHA-256 before / after repository copy.
The repository copy of each original must hash-identically to the supplied file.

Commit the untouched originals in a dedicated asset-only commit before creating runtime derivatives.

Runtime derivatives are allowed only after originals are safe:
- keep them in a separate runtime path;
- never replace the originals;
- derivative crop / scale must be presentation-only and reproducible from the original.

If the seven exact source files are not actually present in the WORK workspace:
- report the missing file/path state;
- STOP;
- do not substitute screenshots, chat previews or regenerated lookalikes.

## B5-1 — D30 FINAL ENTRY / BOSS DOMAIN WALL

User-approved role:

The per-Boss authored domain backdrop appears for the first time at D30 FINAL entry.

It is the Boss's actual spatial domain / wall behind the Final confrontation-preparation screen.

Do NOT use it in:
- D0-D25 Boss reports;
- Codex;
- Boss cards;
- ordinary store phases.

### COMPOSITION

Reuse the existing D30 Final composition and Boss art.

The backdrop is a wall/background layer, not:
- a separate card;
- a framed illustration;
- a Boss report;
- a replacement for the Boss character art.

The existing D30 Boss character remains the foreground Boss subject.
The matched domain art sits behind it.

Responsive display:
- preserve source aspect ratio;
- no stretching / squeezing;
- phone may use a centered camera crop of the same environment;
- crop the display, never destructively crop the source original;
- do not force every side prop into phone view;
- the Boss + central domain identity must remain readable.

D30 must not become a full RPG battle-room UI redesign.
The existing shop-management Final information / decision structure remains authoritative.

### INFORMATION PRIORITY

Known Family / Hazard information, party selection and Final preparation must remain legible.

Do not place critical text directly over a busy region of the backdrop when the existing layout can
keep the information on its owned plane.

No new Boss fact is introduced by the environment.

## B5-2 — FINAL PARTY / PREPARATION

Audit the current Source against FINAL_EXPEDITION before visual polish.

Classify any mismatch:
- Canonical vs Source -> Implementation Bug
- presentation weakness with mechanics intact -> Presentation issue

Do not redesign the Final mechanics.

Current exact B5-2 truth:
- eligible 0 -> Fail
- eligible >=1 -> Player may commit any 1..min(3, eligible) party
- voluntary 1/2-person challenge parties are valid even when 3+ are eligible
- no participant-count bonus / penalty / multiplier / auto-fill
- sub-3 commitment uses the approved confirmation
- selection precedes committed Final preparation
- exactly two Bag slots per participant
- fixed Final 50% / buy-price transfer
- real Wallet affordability
- real stock / Gold / Gross Sales accounting
- no purchase/refusal RNG or ordinary SALE dialogue
- valid affordable transfer is deterministic
- no-effect Items are blocked with Demon-Castle wording
- insufficient Wallet uses inline exact required/owned Gold
- Boss-specific shelf + focused preview must match actual Final truth
- one party-wide `토벌 전망` appears only after commitment and uses the committed 1/2/3-person party
- ordinary one-NPC forecast / failure-death readout does not appear in Final preparation
- Final resolver may not auto-commit a non-empty party
- legacy in-progress Final saves may not reopen party selection after proven committed transfer state

Final roster:
- remove rarity-coloured outer frames that compete with selection
- rarity stays as text
- selected state owns the strong frame

Presentation goal:
the Final should feel like the culmination of the store's preparation, not like an unrelated loadout
builder.

REMOVE repeated / stale information before ADDing new panels.

## B5-3 — BOSS CONFIRM / FINAL COMMIT

The confirm is a commitment checkpoint, not another information dashboard.

Current known state may be referenced, but do not repeat the full D25 report.

The Player should understand:
- the chosen Final party is about to leave;
- preparation is final;
- the next action resolves the Final.

Keep a clear return path to Final preparation before commitment.

The commit action may carry the strongest short action treatment in the Run, consistent with the
existing FINAL audio / gate-close language.

Do not add:
- a new mechanic;
- an extra Boss reveal;
- a second backdrop card;
- a cinematic framework.

The D30 backdrop may remain visible as the environmental layer behind the confirmation shade; do not
duplicate it inside the confirmation modal.

## B5-4 — RESULT TRANSITION / B3 END PRESERVATION

Run controlled:
- Final CLEAR
- Final FAIL
- no eligible party / inherited fallback path where applicable

Verify:
- one Final resolution only;
- correct result truth reaches the existing END / ENDFAIL surface;
- Final party / last supply evidence remains correct where B3 owns it;
- backdrop / Final UI does not leak or remain stuck over END;
- no duplicate Boss report / D25 payload appears;
- B3 END layout is byte / screenshot stable unless an actual Final integration regression requires a
  narrow fix.

Do not restyle END / ENDFAIL in Batch 5.

## REVIEW STAGES

### CHECKPOINT 0 — ASSET MAPPING

Deliver:
- seven-file inventory;
- SHA-256 / dimensions;
- Boss mapping table;
- ambiguity report.

STOP before runtime binding.

### CHECKPOINT 1 — D30 ENTRY

After mapping approval:
- preserve originals in asset-only commit;
- create runtime derivatives only if needed;
- integrate the seven mappings;
- deliver D30 entry captures for representative Bosses first:
  - at least 3 distinct visual families on 390 and 1280;
  - include SLOTH if its D30 form/backdrop interaction differs;
- then verify all seven Boss mappings.

STOP for visual review.

### CHECKPOINT 2 — FINAL PREP / CONFIRM

After entry approval:
- audit and polish party selection / Final preparation;
- polish BOSS CONFIRM;
- deliver 390 / 1280 before-after evidence and relevant state variants.

STOP for review.

### CHECKPOINT 3 — CLEAR / FAIL

After confirm approval:
- verify CLEAR / FAIL transition into existing B3 END;
- deliver evidence;
- STOP.

Do not proceed to Batch 6 without approval.

## QA

At minimum verify:
- Final roster selection frame beats rarity frame; no rarity-frame ambiguity
- voluntary 1/2-person party with 3+ eligible is supported
- sub-3 confirmation uses approved copy
- party-wide `토벌 전망` uses actual committed 1/2/3 participants and shared qualitative bands
- forecast updates after committed transfers without consuming RNG
- no individual ordinary expedition forecast / death-risk copy in Final prep
- no player-facing internal `Final 효과 없음` copy
- insufficient Wallet exact-value status
- no ordinary SALE dialogue / refusal roll in Final prep
- Final resolver rejects uncommitted non-empty party
- legacy in-progress Final save preserves proven commitment / transfer state
- seven-Boss preview-vs-resolution truth
- source-original SHA-256 preservation;
- all seven Boss -> backdrop mappings;
- phone 360 / 390 / 412;
- desktop 1024 / 1280;
- no aspect-ratio distortion;
- no early backdrop exposure before D30;
- D25 persisted state reused;
- Save/Load does not reroll Final state;
- Final mechanics / accounting unchanged unless fixing a proven Source bug;
- all existing tests remain green;
- approved B4 Boss-information captures are not changed by the backdrop work;
- approved B3 END / ENDFAIL presentation remains stable.

## STOP CONDITIONS

STOP immediately if:
- any of the seven mapping assignments is uncertain;
- exact original source bytes cannot be located;
- original hash changes after repository storage;
- backdrop integration would require changing Final mechanics;
- a Canonical / Source mismatch is found whose Design intent is not already explicit.

Do not guess.
Do not regenerate missing art.
Do not silently change Design.


## BATCH 5 CLOSEOUT

Batch 5 is CLOSED by DIRECTOR / User review.

Closed scope:
- B5-0 — seven authored Boss-domain originals preserved and mapped;
- B5-1 — D30 Boss-domain backdrop / Boss hero / known-threat presentation;
- B5-2 — 1..3-person Final party selection, committed preparation, deterministic Final transfer,
  party-wide subjugation forecast, truthful Boss-specific Item preview and Final control hygiene;
- B5-3 — BOSS CONFIRM as the single Final commitment checkpoint;
- B5-4 — controlled CLEAR / FAIL / non-Final transition verification into the already-approved B3 END.

Final B5-4 review evidence:
- current implementation branch reached `2cc31f52461664be4cfd257f1ad412ea4c24aa5c`;
- B5-4 required no END / ENDFAIL Source change;
- controlled CLEAR / FAIL each resolved once and preserved Final party / last-supply evidence;
- Store Capital settlement / Meta finish remained one-shot and reload-idempotent;
- no D30 Final layer / Boss backdrop / D25 payload leaked onto END;
- approved B3 END / ENDFAIL captures remained unchanged in the reviewed comparison;
- existing B5-1 / B5-2 / B5-3 regressions remained green in the closeout run.

This closeout does not authorize a Batch 6, merge, release freeze or unrelated Presentation change.
Those begin only from a new explicit task.
