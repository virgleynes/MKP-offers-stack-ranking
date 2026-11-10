# Setup guide

## Your resources

| Resource | URL |
|----------|-----|
| GitHub repo | https://github.com/virgleynes/MKP-offers-stack-ranking |
| Google Sheet | https://docs.google.com/spreadsheets/d/10xYpZHTlGvGPoS0HWbU6UkHiJv_4oQGKa7biwWrZUM0 |
| Web app URL | https://script.google.com/macros/s/AKfycbz-xte8ngRTNoelnhqRh2UzcmhjIfR1oVvQ10s1CnqbVfu4hTUU42wK9TmFKqLaBbRY/exec |

The web app URL is already configured in `index.html`.

---

## 1. Prepare the Google Sheet

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/10xYpZHTlGvGPoS0HWbU6UkHiJv_4oQGKa7biwWrZUM0/edit).
2. Rename the first tab to **`Responses`** (exact spelling, capital R).
3. Put these headers in row 1 (columns A–J):

   ```
   Timestamp | Name | Rank 1 | Rank 2 | Rank 3 | Rank 4 | Rank 5 | Rank 6 | Rank 7 | Rank 8
   ```

---

## 2. Fix Apps Script (one command)

The web app is deployed but has no code yet. Run this from Terminal:

```bash
cd ~/Documents/MKP-offers-stack-ranking
./scripts/deploy-apps-script.sh
```

What it does:
1. Installs `clasp` (Google Apps Script CLI) if needed
2. Opens Google login (one-time)
3. Pushes `apps-script/Code.gs` to your bound project
4. Redeploys the existing web app URL
5. Tests the endpoint

You should see: `Stack rank webhook is running.`

### Manual fallback

If the script fails, paste `apps-script/Code.gs` into **Extensions → Apps Script → Code.gs**, save, then **Deploy → Manage deployments → Edit → New version → Deploy**.

---

## 3. Run the ranking page

### Option A — GitHub Pages (recommended for sharing)

1. On GitHub: repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Save
5. Your live URL will be: `https://virgleynes.github.io/MKP-offers-stack-ranking/`

### Option B — Open locally

```bash
cd MKP-offers-stack-ranking
python3 -m http.server 8080
```

Visit `http://localhost:8080`

### Option C — Open file directly

Double-click `index.html` (works, but some browsers restrict fetch to local files).

---

## 4. Test end-to-end

1. Open the ranking page
2. Enter a test name
3. Drag rows, click **Submit**
4. Refresh the Google Sheet — a new row should appear

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Script function not found: doGet` or `doPost` | Paste full script into `Code.gs`, save, redeploy as **New version** |
| Row not appearing | Check tab is named `Responses` |
| Submit succeeds, sheet empty | Apps Script → **Executions** → check error log |
| CORS / network errors | Ensure web app access is **Anyone** |
