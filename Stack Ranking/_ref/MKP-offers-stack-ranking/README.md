# MKP Offers — Stack Ranking

Drag-and-drop stack ranking exercise for information prioritization research.

## Live demo

Enable [GitHub Pages](SETUP.md#option-a--github-pages-recommended-for-sharing) on this repo, then share:

`https://virgleynes.github.io/MKP-offers-stack-ranking/`

## Setup

See **[SETUP.md](SETUP.md)** for Google Sheet + Apps Script configuration.

## How it works

- Participants drag information types into their preferred rank order
- **Rank 1** = most influential, **Rank 8** = least influential
- Submissions append a row to the [Google Sheet](https://docs.google.com/spreadsheets/d/10xYpZHTlGvGPoS0HWbU6UkHiJv_4oQGKa7biwWrZUM0)

## Files

- `index.html` — Self-contained ranking page (HTML, CSS, JS)
- `google-apps-script/stack-rank-webhook.gs` — Webhook that writes to Google Sheets
- `assets/celebration.svg` — Success screen illustration
