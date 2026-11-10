#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APPS_SCRIPT_DIR="$ROOT/apps-script"

# After first deploy, paste your web app URL and deployment ID here.
WEBAPP_URL="${WEBAPP_URL:-REPLACE_ME}"
DEPLOYMENT_ID="${DEPLOYMENT_ID:-REPLACE_ME}"

echo "==> Installing clasp if needed..."
if ! command -v clasp >/dev/null 2>&1; then
  npm install -g @google/clasp
fi

echo "==> Logging in to Google (skip if already logged in)..."
clasp login || true

if [[ ! -f "$APPS_SCRIPT_DIR/.clasp.json" ]]; then
  echo ""
  echo "No apps-script/.clasp.json found."
  echo "Create one after binding Apps Script to your sheet, e.g.:"
  echo '  { "scriptId": "YOUR_SCRIPT_ID", "rootDir": "." }'
  echo "See SETUP.md for details."
  exit 1
fi

echo "==> Pushing Code.gs to your Apps Script project..."
cd "$APPS_SCRIPT_DIR"
clasp push

if [[ "$DEPLOYMENT_ID" == "REPLACE_ME" ]]; then
  echo ""
  echo "Code was pushed. Create or update a web app deployment in the Apps Script UI,"
  echo "then set DEPLOYMENT_ID / WEBAPP_URL and re-run this script — or follow SETUP.md."
  exit 0
fi

echo "==> Redeploying web app..."
clasp deploy --description "Stack rank webhook" --deploymentId "$DEPLOYMENT_ID"

echo ""
echo "==> Testing webhook..."
RESPONSE="$(curl -sL "$WEBAPP_URL")"
echo "$RESPONSE"

if echo "$RESPONSE" | grep -q "Stack rank webhook is running"; then
  echo ""
  echo "SUCCESS — webhook is live at:"
  echo "$WEBAPP_URL"
else
  echo ""
  echo "Code was pushed. If the test still fails, open the sheet → Extensions → Apps Script"
  echo "and confirm Deploy → Manage deployments shows an active web app."
fi
