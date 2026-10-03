#!/bin/bash
# Package each skill as a .zip for upload to Claude.ai (Settings → Capabilities → Skills).
# Output goes to dist/ (git-ignored). Attach the zips to a GitHub release:
#   gh release create v<version> dist/*.zip --title "v<version>" --notes "..."
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
rm -rf dist && mkdir dist

for skill in brd-writer brd-reviewer rachel-pm-skill manual-writer; do
  zip -rq "dist/$skill.zip" "$skill" -x '*.DS_Store'
  echo "dist/$skill.zip"
done
