# INACTIVE ARCHIVE — v2.7 Franchise / Start Contract

```text
STATUS            = INACTIVE_ARCHIVE
RUNTIME_IMPORT    = FORBIDDEN
DESIGN_AUTHORITY  = HISTORICAL_ONLY
```

The v2.7 Franchise progression and Start Contract selection were retired from active gameplay by
the Decoration Package (`META_v2.8.0.md` §RETIRED v2.7 FRANCHISE SYSTEM). This directory preserves
the final v2.7 implementation so the design can be understood or revived later.

Nothing here is loaded by the game. `dist/index.html` does not reference it, no module imports it,
and `tests/` asserts that the active runtime neither derives a Grade, applies the ORDER discount,
credits an Achievement, emits its toast, nor offers a Start Contract.

Contents:

| file | what it preserves |
|---|---|
| `franchise.js` | the ten Achievement definitions with their final thresholds, the Grade ladder and requirement table, the ORDER purchase-price discount, and the progress-readout shape the codex used |
| `contracts.js` | the five Start Contract rows with their Grade gates and their positive and negative effects |
| `NOTES.md` | where each piece was wired into the active source, and what replaced it |

Retired Account payload fields may remain dormant on a save for data preservation. Dormant means
exactly that: no effect, no new progress, no derivation, no UI.
