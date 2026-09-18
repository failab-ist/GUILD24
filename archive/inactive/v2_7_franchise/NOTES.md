# Where the retired system was wired, and what replaced it

| retired piece | was wired into | replaced by |
|---|---|---|
| Franchise Grade derivation | `Meta.grade()`, read by the codex header and by `contractUnlocked` | nothing — no account-wide grade exists |
| ten Achievements + counters | credited at a sale commit (`shop.sell`), a Relic purchase, a supplied survival (`Meta.observe`), the DAY 25 morning, and `Meta.finish` | nothing — Store Capital is earned at Run end instead |
| Grade ORDER discount | `Meta.orderDiscount()` inside the single ORDER price rounding | nothing — no purchase-price passive |
| Grade-gated Start Contract | `Meta.contractUnlocked()`, the pre-Run contract screen, and five `run.contract` effect branches | Decoration loadout; the Run always runs on the neutral `standard` baseline |
| Achievement toast + progress readout | the codex 진행도 panel and the action handler's before/after cue | the 점포 관리 panel, which shows Store Capital and Slots |

The four Decoration effects deliberately reuse the **positive** channels the Start Contracts used
(`ORDER candidates +1`, `visitors`, `starting Gold`, premium rare-NPC weighting) and carry none of
their negative sides — no +5% ORDER price, no +20G/+25G overhead, no reduced rare ORDER.
