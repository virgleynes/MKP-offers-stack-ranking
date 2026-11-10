/**
 * Marketplace stack rank submission webhook (pasteable copy)
 *
 * Spreadsheet: REPLACE_ME — put your Sheet ID in SPREADSHEET_ID below.
 *
 * Setup (do this from Extensions → Apps Script inside the sheet):
 * 1. Replace ALL code in Code.gs with this file.
 * 2. Set SPREADSHEET_ID to your Sheet ID (from the sheet URL).
 * 3. Save (Cmd+S).
 * 4. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone)
 *    OR Deploy → Manage deployments → Edit → Version: New version → Deploy
 * 5. Test: open the web app URL — should show "Stack rank webhook is running."
 * 6. Paste the web app URL into GOOGLE_SCRIPT_URL in index.html
 */

var SPREADSHEET_ID = 'REPLACE_ME';
var SHEET_NAME = 'Responses';
var RANK_COUNT = 11;

function getResponsesSheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'REPLACE_ME') {
    throw new Error('Set SPREADSHEET_ID in Code.gs to your Google Sheet ID.');
  }

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Tab "' + SHEET_NAME + '" not found. Rename your sheet tab to exactly "Responses".');
  }
  return sheet;
}

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = getResponsesSheet_();
    var rankings = payload.rankings || [];
    var rankCells = [];

    for (var i = 1; i <= RANK_COUNT; i++) {
      var match = rankings.filter(function (item) {
        return item.rank === i;
      })[0];

      rankCells.push(match ? match.type : '');
    }

    sheet.appendRow(
      [payload.timestamp || new Date().toISOString(), payload.name || ''].concat(rankCells)
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Stack rank webhook is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
