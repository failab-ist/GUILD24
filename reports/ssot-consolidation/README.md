# SSOT consolidation ledgers

User-approved (2026-09-23) pre-v2.9 cleanup: each current owner that inherits older versions is
merged into ONE self-contained file, so an agent reads one file per owner instead of a chain.
Design does not change.

## Rules (current-spec method, User direction 2026-09-23)

- **Current spec only.** The consolidated owner states what is true now: rules, numbers, formulas,
  flows, current QA acceptance, ownership pointers. Everything else goes to LEGACY: version
  comparisons, change narration ("v2.7 changes..."), superseded values, tuning / playtest history,
  resolved design questions, notes about removed rules, inheritance pointers.
- **Legacy is kept, not lost.** The pre-consolidation owner is saved whole as
  `design_ssot/history/<OWNER>_v2.8.0-patch.md`; older versions stay in `design_ssot/history/`.
- **One section per topic.** Base rule and its later overrides become one section; version tags
  leave headings ("PRIDE — v2.7" -> "PRIDE").
- **Rule text verbatim.** Rule sentences are carried over as written. A line may be reworded only
  to remove version framing or point at the current owner file; the original goes in a `text`
  fence and the new form in a `new` fence under a `REWORD` heading.
- **Canonical, not Source.** A rule is never dropped because Source lacks it; mismatches are
  reported, not resolved here.
- **Filename kept.** No version bump for consolidation alone (FINAL_EXPEDITION v2.7.0 -> v2.8.0 was
  renamed because it already carried v2.8 rules).
- **Ledger.** One file per owner here: `BASELINE=` / `TARGET=` / `CHAIN=`; every dropped chain line in
  a ```text fence under a heading `LEGACY` / `SUPERSEDED` / `REWORD` with the reason; every target line
  that is in no chain file in a ```new fence.
- **Check.** `npm run ssot:check` must PASS, then an independent semantic review.
- **Conflict = stop.** If versions disagree and the later one does not clearly supersede, or a rule
  is undefined, it is reported to the User, not decided here.
- One owner (or a small pair) per commit.
