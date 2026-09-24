#!/bin/sh
# Tuning round 2 re-measure (game data now carries x0.7 prices + round-2 tuning; no overrides).
cd "$(dirname "$0")/../../.." || exit 1
T=tools/relic-contribution.cjs; O=reports/relic-balance/v2
node $T 2000 --builds --aware --out $O/r2-builds-fresh-balanced.json > $O/r2-builds-fresh-balanced.log 2>&1
node $T 2000 --builds --aware --account full --out $O/r2-builds-full-balanced.json > $O/r2-builds-full-balanced.log 2>&1
node $T 2000 --builds --aware --policy skilled --out $O/r2-builds-fresh-skilled.json > $O/r2-builds-fresh-skilled.log 2>&1
node $T 2000 --builds --aware --policy beginner --out $O/r2-builds-fresh-beginner.json > $O/r2-builds-fresh-beginner.log 2>&1
node $T 1000 all --aware --out $O/r2-relics-fresh-balanced.json > $O/r2-relics-fresh-balanced.log 2>&1
node $T 1000 bulk+logisticsHQ+rotation,bulk+logisticsHQ,stamp+premiumMember+lifetime,premiumMember+royalCert,guarantee+royalCert,showcase+royalCert,showcase+guarantee+royalCert,medicine+expeditionCert,medicine+expeditionCert+hazardBoard --aware --out $O/r2-synergy-fresh-balanced.json > $O/r2-synergy-fresh-balanced.log 2>&1
echo DONE > $O/r2-done
