# Marketplace — Stack Ranking

Drag-and-drop stack ranking exercise for Marketplace friction prioritization research.

**Rank 1** = most important · **Rank 11** = least important

## Live demo

After you enable GitHub Pages (see [SETUP.md](SETUP.md)), share:

`https://<your-github-username>.github.io/<repo-name>/`

Until Sheets is connected, Submit still shows the thank-you screen and logs the payload in the browser console.

## Setup

See **[SETUP.md](SETUP.md)** for Google Sheet + Apps Script + Pages configuration.

## How it works

- Participants drag friction items into their preferred rank order
- Submissions append a row to your Google Sheet (once connected)
- Design matches the Marketplace E2E Figma stack-ranking frame

## Files

- `index.html` — Self-contained ranking page (HTML, CSS, JS)
- `apps-script/Code.gs` — Webhook that writes Rank 1–11 to Google Sheets
- `google-apps-script/stack-rank-webhook.gs` — Pasteable copy of the same webhook
- `assets/celebration.svg` — Success screen illustration
- `scripts/deploy-apps-script.sh` — Optional clasp push/redeploy helper
