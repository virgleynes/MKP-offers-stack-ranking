#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APPS_SCRIPT_DIR="$ROOT/apps-script"
WEBAPP_URL="https://script.google.com/macros/s/AKfycbz-xte8ngRTNoelnhqRh2UzcmhjIfR1oVvQ10s1CnqbVfu4hTUU42wK9TmFKqLaBbRY/exec"
DEPLOYMENT_ID="AKfycbz-xte8ngRTNoelnhqRh2UzcmhjIfR1oVvQ10s1CnqbVfu4hTUU42wK9TmFKqLaBbRY"

echo "==> Installing clasp if needed..."
if ! command -v clasp >/dev/null 2>&1; then
  npm install -g @google/clasp
fi

echo "==> Logging in to Google (skip if already logged in)..."
clasp login || true

echo "==> Pushing Code.gs to your Apps Script project..."
cd "$APPS_SCRIPT_DIR"
clasp push

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
