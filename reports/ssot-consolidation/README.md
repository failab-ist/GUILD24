# SSOT consolidation ledgers

User-approved (2026-09-23) pre-v2.9 cleanup: each current owner that inherits older versions is
merged into ONE self-contained file, so an agent reads one file per owner instead of a chain.
Design does not change.

## Rules

- **Verbatim merge.** Chain text is carried over as written; nothing is paraphrased. Only lines a
  later version replaced, retired or made obsolete are dropped.
- **Filename kept.** The current owner keeps its name and version. No version bump for
  consolidation alone. Exception: FINAL_EXPEDITION_v2.7.0 already carries v2.8 changes and is renamed
  to v2.8.0 when consolidated.
- **Header.** The consolidated owner drops its INHERITANCE-to-older-file section and records
  `CONSOLIDATED_FROM=` (the chain) and `CONSOLIDATION_LEDGER=` (this folder's file).
- **Ledger.** One file per owner here, with `BASELINE=` / `TARGET=` / `CHAIN=` keys. Every dropped
  chain line sits inside a ```text fence under a heading that says what superseded it.
- **Check.** `npm run ssot:check` must PASS: every chain line is either verbatim in the target or
  in the ledger. NEW lines (in the target, in no chain file) are reviewed: structure only, no rule.
- **Conflict = stop.** If two chain versions disagree and the later one does not clearly
  supersede, the owner is not consolidated until the User decides.
- One owner (or a small pair) per commit; history files stay in `design_ssot/history/`.
