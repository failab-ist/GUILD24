#!/bin/bash
# Claude Code on the web: install what `npm test` and `npm run qa:*` need.
# - node devDependencies (playwright, animejs, uisfx, wanted-sans)
# - python3 fontTools + brotli (tests/assets.cjs reads the woff2 fonts with them)
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

npm install --no-audit --no-fund

if ! python3 -c "import fontTools, brotli" 2>/dev/null; then
  pip install --quiet --disable-pip-version-check fonttools brotli
fi
