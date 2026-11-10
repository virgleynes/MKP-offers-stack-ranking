# Setup guide

Connect a new Google Sheet when you are ready. The ranking page works locally without Sheets; submissions log to the browser console until you paste a web app URL into `index.html`.

| Resource | Value |
|----------|-------|
| Google Sheet | Create a new sheet, then paste its URL here |
| Sheet ID | From the URL: `https://docs.google.com/spreadsheets/d/`**`SHEET_ID`**`/edit` |
| Web app URL | Paste after Apps Script deploy |
| GitHub Pages URL | `https://<user>.github.io/<repo>/` |

---

## 1. Prepare the Google Sheet

1. Create a new Google Sheet.
2. Rename the first tab to **`Responses`** (exact spelling, capital R).
3. Put these headers in row 1 (columns A–M):

   ```
   Timestamp | Name | Rank 1 | Rank 2 | Rank 3 | Rank 4 | Rank 5 | Rank 6 | Rank 7 | Rank 8 | Rank 9 | Rank 10 | Rank 11
   ```

4. Copy the **Sheet ID** from the browser URL.

---

## 2. Install the Apps Script webhook

### Option A — Paste in the sheet (simplest)

1. In the sheet: **Extensions → Apps Script**.
2. Delete any default code in `Code.gs`.
3. Paste the contents of [`google-apps-script/stack-rank-webhook.gs`](google-apps-script/stack-rank-webhook.gs)  
   (or [`apps-script/Code.gs`](apps-script/Code.gs) — they match).
4. Set:

   ```javascript
   var SPREADSHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```

5. Save (Cmd+S).
6. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Deploy, authorize if prompted, and copy the **Web app URL**.

### Option B — clasp (optional)

1. From the sheet’s Apps Script editor, note the **Script ID** (Project Settings).
2. Create `apps-script/.clasp.json`:

   ```json
   {
     "scriptId": "YOUR_SCRIPT_ID",
     "rootDir": "."
   }
   ```

3. Put your Sheet ID in `apps-script/Code.gs` (`SPREADSHEET_ID`).
4. Run:

   ```bash
   ./scripts/deploy-apps-script.sh
   ```

5. After the first UI deploy, set `WEBAPP_URL` / `DEPLOYMENT_ID` in that script (or export them as env vars) for redeploys.

Open the web app URL in a browser — you should see: `Stack rank webhook is running.`

---

## 3. Wire the ranking page

1. Open [`index.html`](index.html).
2. Find:

   ```javascript
   var GOOGLE_SCRIPT_URL = '';
   ```

3. Paste your web app URL:

   ```javascript
   var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...../exec';
   ```

4. Save.

---

## 4. Run the ranking page

### Option A — GitHub Pages (recommended for sharing)

1. Push this folder to a GitHub repo (do not commit `_ref/` if you keep it locally).
2. Repo **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **/ (root)**
5. Save
6. Live URL: `https://<user>.github.io/<repo>/`

### Option B — Open locally

```bash
cd "/Users/vleynes/Documents/Claude/Marketplace M2/Stack Ranking"
python3 -m http.server 8080
```

Visit `http://localhost:8080`

### Option C — Open file directly

Double-click `index.html` (works for UI; some browsers restrict `fetch` to local files once Sheets is wired).

---

## 5. Test end-to-end

1. Open the ranking page
2. Enter a test name
3. Drag rows (Rank 1 = most important, Rank 11 = least)
4. Click **Submit**
5. Refresh the Google Sheet — a new row should appear with the 11 ranked labels

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Set SPREADSHEET_ID...` | Put your real Sheet ID in `Code.gs` and save/redeploy |
| `Script function not found: doGet` or `doPost` | Paste full script into `Code.gs`, save, redeploy as **New version** |
| Row not appearing | Check tab is named `Responses` and headers are Rank 1–11 |
| Submit succeeds, sheet empty | Apps Script → **Executions** → check error log |
| CORS / network errors | Ensure web app access is **Anyone** |
| Console-only submit | `GOOGLE_SCRIPT_URL` is still empty in `index.html` |
